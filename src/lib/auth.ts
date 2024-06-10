import type { NextAuthOptions, DefaultUser } from "next-auth";
import NextAuth, {
  getServerSession as orgGetServerSession,
} from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getCredentialsUser } from "./services/getCredentialsUser";
import { getRandomDemoUser } from "./services/getDemoUser";
import { Session } from "inspector";

export const authOptions: NextAuthOptions = {
  // JWTを暗号化するための秘密鍵
  secret: process.env.EXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== "production",
  session: {
    // JSON Web tokenをセッションtokenに使用
    strategy: "jwt",
    //デフォルト 30 days
    // maxAge: 30 * 24 * 60 * 60,
    maxAge: 1 * 24 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials, req): Promise<DefaultUser | null> {
        const { returnData } = await getCredentialsUser(
          credentials?.username ?? "",
          credentials?.password ?? ""
        );

        if (returnData) {
          const { account_id, mst_accounts } = returnData[0];

          //JWTのuserに引き渡し
          const user: DefaultUser = {
            id: String(account_id),
            name: mst_accounts?.name ?? "",
            email: mst_accounts?.email ?? "",
            image: mst_accounts?.thumbnail ?? "",
          };

          return user;
        } else {
          // 認証失敗の場合はnullを返却
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/signin/error",
  },
  callbacks: {
    //jwtコールバックは`authorize()`の後に実行される
    jwt: async ({ token, user, account }) => {
      // デモユーザをDB取得（※ランダム）
      const demoUser = await getRandomDemoUser();

      // 初回サインイン時にaccountとuser情報を取得
      if (account) {
        if (!user) return token;
        // OAuthの場合
        if (account.type === "oauth") {
          if (demoUser) {
            // デモユーザのidとnameでトークンを上書き
            token.id = demoUser.user?.account_id;
            token.name = demoUser.user?.name;
            token.email = user.email;
            token.image = user.image;
          }
        } else {
          // credentialの場合
          token.id = user.id;
          token.name = user.name;
          token.email = user.email;
          token.image = user.image;
        }
      }
      return token;
    },
    // sessionコールバックはjwtコールバックの後に実行
    session: async ({ session, token, user }) => {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
      }

      return await Promise.resolve(session);
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const { handler, auth, signIn, signOut, theme } = NextAuth(authOptions);

export const getServSession = async () => {
  return await orgGetServerSession(authOptions);
};
