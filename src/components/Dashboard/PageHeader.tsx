function PageHeader({ title }: { title: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        {title}
      </h1>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>🏠</span>
        <span>&gt;</span>
        <span>Home</span>
        <span>&gt;</span>
        <span className="text-gray-900 font-medium">{title}</span>
      </div>
    </div>
  );
}

export default PageHeader;
