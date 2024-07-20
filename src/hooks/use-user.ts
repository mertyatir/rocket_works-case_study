import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { firebaseAuth } from "@/libs/firebase/config";


export function useUser() {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        let unsubscribe: () => void = () => { };
        async function fetchUser() {
            const user = await new Promise<User>((resolve, reject) => {
                unsubscribe = onAuthStateChanged(
                    firebaseAuth,
                    (user: User | null) => {
                        if (user) {
                            resolve(user);
                        } else {
                            reject("No user logged in");
                        }
                    },
                    reject
                );
            });
            setUser(user);
        }
        fetchUser()
        return unsubscribe;
    }, []);
    return user;
}
