type StatusPageProps = {
  code?: string;
  message: string;
};

/** Shared minimal view for not-found and error states. */
const StatusPage = ({ code, message }: StatusPageProps) => (
  <main className="flex min-h-screen items-center justify-center px-4">
    <p className="text-sm text-textSecondary/60">
      {code && <span className="text-textSecondary">{code}</span>}
      {code && <span className="mx-3 text-textSecondary/30">|</span>}
      {message}
    </p>
  </main>
);

export default StatusPage;
