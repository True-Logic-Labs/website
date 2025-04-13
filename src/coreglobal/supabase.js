import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase credentials
const SUPABASE_URL = 'https://ggahkdpgjlxgdftylqqu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnYWhrZHBnamx4Z2RmdHlscXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2OTMzNzQsImV4cCI6MjA1MzI2OTM3NH0.7ojsZV7pIz9zzdRb1hO4iPMiEKm4vp2pODwn3W8mrDA';

const supabase = createClient( SUPABASE_URL, SUPABASE_ANON_KEY );

export class AuthManagement
{
//     async getAllUsers ()
//     { 
//         const supabase = createClient(SUPABASE_URL, "GET-THIS-FROM-ENV-FILE-TO-RUN-PROPERLY", {
//         auth: {
//             autoRefreshToken: false,
//             persistSession: false
//         }
// })
//     const {data: {users},error,} = await supabase.auth.admin.listUsers({
//         page: 1,
//         perPage: 1000,
//     } );
//                 if (error) {
//             console.error("Error creating user:", error.message);
//         } else {
//             // console.log("User created:", data);
//         }
//     }
    
    
    // Create a new user
    async createUser(email, password,dataObject) {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: dataObject
            },
        } );
    //    const { data, error } = await supabase.auth.signInWithOtp({
    //             phone: '+91983344333',
    //             })


        if (error) {
            console.error("Error creating user:", error.message);
        } else {
            // console.log("User created:", data);
        }
    }

    // Log in a user
    async loginUser ( email, password )
    {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            console.error("Error logging in:", error.message);
        } else {
            // console.log("User logged in:", data);
        }
    }
    
    // Get current session
    async getSubscriptions() {
        const { data, error } = await supabase.auth.getSession();
        const statusis = document.getElementById("user-info");

        if (error) {
            console.error("Error getting session:", error.message);
        } else {
            // console.log( "Current session:", data.session.user.user_metadata.subscription );
            return data.session.user.user_metadata.subscription
        }
    }

        async getSession() {
        const { data, error } = await supabase.auth.getSession();
        const statusis = document.getElementById("user-info");

        if (error) {
            console.error("Error getting session:", error.message);
        } else {
            // console.log("Current session:", data);
            if ( data.session == null )
            {
                try
                {
                    
                    statusis.innerText = "Logged Out :(";
                } catch
                { 
                    
                }
                return;
            }
            if ( data.session.user )
            {
                try
                {
                    statusis.innerText = `Hi ${data.session.user.user_metadata.first_name}, You are logged in!!`;
                } catch
                { 
                    
                }
            }
        }
    }

    async globalGetSession() {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
            window.session = "NotLoggedIn_Error"
            console.error( "Error getting session:", error.message );
        } else {
            if ( data.session == null )
            {
                window.session = "NotLoggedIn"
            } else
            { 
                window.sessionObject = data
                window.session = "LoggedIn"
            }
        }
        // // console.log( window.session );
        return window.session
    }

    async globalGetSessionServer() {
        const { data, error } = await supabase.auth.getSession();
        let sessObj = {}
        if (error) {
            console.error( "Error getting session:", error.message );
            sessObj.status = 400
            sessObj.data = error
            return sessObj
        } else
        {
            if ( data.session === null )
            {
                sessObj.status = 401
                sessObj.data = data.session
            } else
            { 
                sessObj.status = 200
                sessObj.data = data.session
            }
            return sessObj
        }
    }

    // Log out a user
    async logoutUser() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error logging out:", error.message);
        } else {
            // console.log("User logged out.");
        }
    }

    // Handle subscription (Insert a new subscription into the 'subscriptions' table)
    async addSubscription(subscriptionData) {
        // Step 1: Get the authenticated user
        const { data: user, error: userError } = await supabase.auth.getUser();

        if (userError) {
            console.error("Error getting user:", userError.message);
            return;
        }

        if (!user) {
            console.error("No user is logged in.");
            return;
        }

        // Step 2: Fetch the current metadata
        const currentMetadata = user.user.user_metadata || {}; // Get current metadata (defaults to empty object if none)
        
        // Step 3: Initialize or append to the 'subscriptions' array
        const updatedSubscriptions = currentMetadata.subscription || [];  // Get current subscriptions or initialize as empty array
        // // console.log(updatedSubscriptions)
        // Append the new subscription to the array
        updatedSubscriptions.push(subscriptionData);

        // Step 4: Prepare the updated metadata with the new subscription array
        const updatedMetadata = {
            ...currentMetadata,  // Keep other metadata intact
            subscription: updatedSubscriptions,  // Add or update the 'subscription' key
        };
        // // console.log(updatedMetadata)
        // Step 5: Update the user's metadata
        const { data, error } = await supabase.auth.updateUser({
            data: updatedMetadata,  // Update the metadata with the new 'subscription' array
        });

        if (error) {
            console.error("Error updating user metadata:", error.message);
        } else {
            // console.log("User metadata updated:", data);
        }
    }

async manageTokens(action, tokenData) {
    // Step 1: Get the authenticated user
    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError) {
        console.error("Error getting user:", userError.message);
        return;
    }

    if (!user) {
        console.error("No user is logged in.");
        return;
    }

    // Step 2: Fetch the current metadata
    const currentMetadata = user.user.user_metadata || {};
    let tokenBank = currentMetadata.tokenBank || { amount: 0, validTill: null };

    if (action === "addTokens") {
        tokenBank.amount += tokenData.amount;
        tokenBank.validTill = tokenData.validTill
        
    } else if (action === "removeTokens") {
        tokenBank.amount = Math.max(0, tokenBank.amount - tokenData.amount);
        
        // If all tokens are removed, reset validTill
        if (tokenBank.amount === 0) {
            tokenBank.validTill = null;
        }

    } else if (action === "getTokenCount") {
        const currentDate = new Date();
        const validTillDate = tokenBank.validTill ? new Date(tokenBank.validTill) : null;
        
        const isExpired = validTillDate ? currentDate > validTillDate : false;

        return {
            amount: tokenBank.amount,
            validTill: tokenBank.validTill,
            isExpired: isExpired
        };
    } else {
            console.error("Invalid action");
            return;
    }

    // Step 3: Prepare updated metadata
    const updatedMetadata = {
        ...currentMetadata,
        tokenBank,
    };

    // Step 4: Update the user's metadata
    const { data, error } = await supabase.auth.updateUser({
        data: updatedMetadata,
    });

    if (error) {
        console.error("Error updating user metadata:", error.message);
    } else {
        console.log("User metadata updated successfully.");
    }
}



}
