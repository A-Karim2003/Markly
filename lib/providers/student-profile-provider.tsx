export type CounterStoreApi = ReturnType<typeof createCounterStore>;

export const StudentStoreContext = createContext<>(
  undefined,
);

export const StudentStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <StudentStoreContext>{children}</StudentStoreContext>;
};
