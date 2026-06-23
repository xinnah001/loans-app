type BalanceProps = {
  balance: number;
};

export default function Balance({
  balance,
    }: BalanceProps) {

  return (
    <div>
      <h2>Balance</h2>
      <p>Ksh {balance}</p>
    </div>
  );
}