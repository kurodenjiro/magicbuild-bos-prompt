// Show balance Near
const res = fetch(`https://api.nearblocks.io/v1/account/${props.wallet_id || context.accountId}`);

if (!(res && res.body)) return "...";

const native_balance = res.body.account[0].amount / 1e24;
const unspendable_balance = 0.05 + res.body.account[0].storage_usage / 1e5;
const spendable_balance = native_balance - unspendable_balance;

const balance =
  props.balance_type === "spendable" ? spendable_balance : native_balance;

return <span>{balance.toFixed(props.decimal_places ?? 2)}</span>