import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { query as q } from 'faunadb';
import { fauna } from '../../../services/fauna';

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: { params: { scope: 'read:users' } },
        }),
    ],
    callbacks: {
        async signIn({ user }) {


            try {
                const { email } = user;

                await fauna.query(
                    q.Create(
                        q.Collection('users'),
                        { data: { email } }
                    )
                )

                return true;
            } catch {
                return false
            }
        }
    }
}
export default NextAuth(authOptions)