export default function GenerateLoading() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-24 flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="mt-4 text-muted-foreground">Loading…</p>
      </div>
    </div>
  );
}
