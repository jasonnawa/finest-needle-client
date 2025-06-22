export const Field = ({ label, value }: { label: string; value?: any }) => {
    if (!value) return null;
    return (
      <div className="flex justify-between gap-4">
        <span className="font-medium">{label}:</span>
        <span className="text-right break-words">{value}</span>
      </div>
    );
  };
  