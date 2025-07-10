import { Adapter, AdapterAccount, AdapterSession, AdapterUser } from "next-auth/adapters";
import sql from "mssql";

export function MssqlAdapter(client: sql.ConnectionPool): Adapter {

 return {
    async createUser(user) {
      const result = await client.request()
        .input("Id", sql.UniqueIdentifier, user.id)
        .input("Name", sql.NVarChar, user.name)
        .input("Email", sql.NVarChar, user.email)
        .input("Image", sql.NVarChar, user.image)
        .input("EmailVerified", sql.DateTimeOffset, user.emailVerified)
        .execute("con_CreateUser");

      const userRow = result?.recordset[0];

      const newUser = {
        id: userRow.Id,
        name: userRow.Name,
        email: userRow.Email,
        image: userRow.Image,
        emailVerified: userRow.EmailVerified
      }

      return newUser as AdapterUser;
    },
    async createSession(session) {
      const result = await client.request()
        .input("SessionToken", sql.NVarChar, session.sessionToken)
        .input("UserId", sql.UniqueIdentifier, session.userId)
        .input("Expires", sql.DateTimeOffset, session.expires)
        .execute("con_CreateSession");
      
      const sessionRow = result?.recordset[0];
 
      const newSession = {
        sessionToken: sessionRow.SessionToken,
        userId: sessionRow.UserId,
        expires: sessionRow.Expires
      }
      return newSession as AdapterSession; 
    },
    async getSessionAndUser(sessionToken) {
      const result = await client.request()
        .input("sessionToken", sql.VarChar, sessionToken)
        .execute("con_GetSessionAndUser");

      const row = result?.recordset[0];

      if (!row) return null;

      const session =  {
        sessionToken: row.SessionToken,
        userId: row.UserId,
        expires: row.Expires
      };

      const user  ={
        id: row.UserId,
        name: row.Name,
        email: row.Email,
        image: row.Image,
        emailVerified: row.EmailVerified
      };

      return {
        session: session as AdapterSession,
        user: user as AdapterUser
      };
    },
    async updateSession(session) {
      const result = await client.request()
        .input("sessionToken", sql.VarChar, session.sessionToken)
        .input("expires", sql.DateTimeOffset, session.expires)
        .execute("con_UpdateSession");

      const row = result?.recordset[0];
      
      const updatedSession = {
        sessionToken: row.SessionToken,
        userId: row.UserId,
        expires: row.Expires
      };

      return updatedSession as AdapterSession;
    },
    async deleteSession(sessionToken) {

      const result = await client.request()
        .input("sessionToken", sql.VarChar, sessionToken)
        .execute("con_DeleteSession");

      const row = result?.recordset[0];
      if (!row) return null; // If no session was found, return null

      const deletedSession = {
        sessionToken: row.SessionToken,
        userId: row.UserId,
        expires: row.Expires
      };

      return deletedSession as AdapterSession; // Return the deleted session
    },
    async getUser(id) {
      const result = await client.request()
        .input("Id", sql.UniqueIdentifier, id)
        .execute("con_GetUserById");

      console.log("getUser result:", result);
      const userRow = result?.recordset[0];
      
      if (!userRow) return null;  
      
      const user = {
        id: userRow.Id,
        name: userRow.Name,
        email: userRow.Email,
        image: userRow.Image,
        emailVerified: userRow.EmailVerified
      };
      
      return user as AdapterUser; // Return the user
    },
    async getUserByEmail(email) {
      const result = await client.request()
        .input("Email", sql.NVarChar, email)
        .execute("con_GetUserByEmail");
      console.log("getUserByEmail result:", result);
      const userRow = result?.recordset[0];

      if (!userRow) return null; 

      const user = {
        id: userRow.Id,
        name: userRow.Name,
        email: userRow.Email,
        image: userRow.Image,
        emailVerified: userRow.EmailVerified
      };
 
      return user; 
    },
    async getUserByAccount({provider, providerAccountId}) {
      const result = await client.request()
        .input("Provider", sql.NVarChar, provider)
        .input("ProviderAccountId", sql.NVarChar, providerAccountId)
        .execute("con_GetUserByAccount");

      console.log("getUserByAccount result:", result);
      const userRow = result?.recordset[0];

      if (!userRow) return null;
      
      const user = {
        id: userRow.Id,
        name: userRow.Name,
        email: userRow.Email,
        image: userRow.Image,
        emailVerified: userRow.EmailVerified
      };
      return user as AdapterUser; 
    },
    async updateUser(user) {
      const result = await client.request()
        .input("Id", sql.UniqueIdentifier, user.id)
        .input("Name", sql.NVarChar, user.name)
        .input("Email", sql.NVarChar, user.email)
        .input("Image", sql.NVarChar, user.image)
        .input("EmailVerified", sql.DateTimeOffset, user.emailVerified)
        .execute("con_UpdateUser");
      
      const userRow = result?.recordset[0];
      
      const updatedUser = {
        id: userRow.Id,
        name: userRow.Name,
        email: userRow.Email,     
        image: userRow.Image,
        emailVerified: userRow.EmailVerified
      };
      return updatedUser as AdapterUser;
    },
    // async deleteUser(userId) {
    //   // Logic to delete a user by ID from your database
    //   return null; // Return null or a confirmation object
    // },
    async linkAccount(account) {
      const result = await client.request()
        .input("Type", sql.VarChar, account.type)
        .input("Provider", sql.NVarChar, account.provider)
        .input("ProviderAccountId", sql.NVarChar, account.providerAccountId)
        .input("UserId", sql.UniqueIdentifier, account.userId)
        .input("AccessToken", sql.NVarChar, account.access_token)
        .input("RefreshToken", sql.NVarChar, account.refresh_token)
        .input("ExpiresAt", sql.DateTimeOffset, account.expires_in)
        .input("TokenType", sql.NVarChar, account.token_type)
        .input("Scope", sql.NVarChar, account.scope)
        .input("IdToken", sql.NVarChar, account.id_token)
        .input("SessionState", sql.NVarChar, account.authorization_details)
        .execute("con_LinkAccount");

      const accountRow = result?.recordset[0];

      if (!accountRow) return null;

      const linkedAccount = {
        userId: accountRow.UserId,
        provider: accountRow.Provider,
        providerAccountId: accountRow.ProviderAccountId,
        type: accountRow.Type,
        access_token: accountRow.AccessToken,
        refresh_oken: accountRow.RefreshToken,
        expires_at: accountRow.ExpiresAt,
        token_type: accountRow.TokenType,
        scope: accountRow.Scope,
        id_token: accountRow.IdToken,
        authorization_details: accountRow.SessionState
      };
      return linkedAccount as AdapterAccount; 
    },
    async getAccount(provider, providerAccountId) {
      const result = await client.request()
        .input("Provider", sql.NVarChar, provider)
        .input("ProviderAccountId", sql.NVarChar, providerAccountId)
        .execute("con_GetAccountByProviderAndProviderAccountId");
      console.log("getAccount result:", result);
      const accountRow = result?.recordset[0];

      if (!accountRow) return null;

      const account = {
        userId: accountRow.UserId,
        provider: accountRow.Provider,
        providerAccountId: accountRow.ProviderAccountId,
        type: accountRow.Type,
        access_token: accountRow.AccessToken,
        refresh_token: accountRow.RefreshToken,
        expires_at: accountRow.ExpiresAt,
        token_type: accountRow.TokenType,
        scope: accountRow.Scope,
        id_token: accountRow.IdToken,
        authorization_details: accountRow.SessionState
      };

      console.log("getAccount result:", account);

      return account as AdapterAccount;
    }
    
    // async unlinkAccount(provider_providerAccountId) {
    //   return null; 
    // },

  };
}