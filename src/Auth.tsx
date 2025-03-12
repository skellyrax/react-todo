import { FormEvent, useEffect, useState } from 'react';
import { remult } from 'remult';
import App from './App';
import { AuthController } from './shared/AuthController';

export default function Auth() {
    const [username, setUsername] = useState("");
    const [signedIn, setSignedIn] = useState(false);

    async function signIn(e: FormEvent) {
        e.preventDefault();
        try {
            remult.user = await AuthController.signIn(username);
            setSignedIn(true);

        } catch (error: unknown) {
            alert((error as { message: string }).message);
        }
    }

    async function signOut() {
        await AuthController.signOut();
        remult.user = undefined;
        setSignedIn(false);
    }
    useEffect(() => {
        remult.initUser().then(() => {
            setSignedIn(remult.authenticated);
        });
    }, []);

    if (!signedIn) {
        return (
            <>
                <h1>Todos</h1>
                <main>
                    <form onSubmit={signIn}>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username, try Steve or Jane"
                        />
                        <button>Sign in</button>
                    </form>
                </main>
            </>
        );
        return (
            <>
                <header>
                Hello {remult.user!.name} <button onClick={signOut}>Sign Out</button>
                </header>
            </>
        )
    };
}