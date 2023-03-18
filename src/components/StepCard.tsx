const StepCard: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div className="mt-10 w-full rounded-md border border-gray-200 bg-white p-4 sm:p-8 md:w-1/2">
      {props.children}
    </div>
  );
};

export { StepCard };
