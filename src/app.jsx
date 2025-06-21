import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import LoginPage from "./page/login-page";
import { AuthContextProvider } from "./context/auth-context";
import ProtectedLayout from "./layouts/protected-layout";
import MainPage from "./page/main-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TeamProvider } from "./context/team-context";

const queryClient = new QueryClient();

const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <AuthContextProvider>
                    <TeamProvider>
                        <AppLayout />
                    </TeamProvider>
                </AuthContextProvider>
            ),
            children: [
                {
                    path: "/login",
                    element: <LoginPage />,
                },
                {
                    path: "/team",
                    element: (
                        <ProtectedLayout>
                            <MainPage />
                        </ProtectedLayout>
                    ),
                },
            ],
        },
    ]);

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
};

export default App;
