import { ThemeProvider } from "@/components/theme-provider";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
                <div className="w-full max-w-md">{children}</div>
            </div>
        </ThemeProvider>
    );
}
