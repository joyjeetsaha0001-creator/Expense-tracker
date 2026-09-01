import { Card } from "@/components/ui/card";
import EditTransactionDialog from "./EditTransactionDialog";
import api from "@/lib/api";

export default function RecentTransactions({ transactions }) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>

      <input
        placeholder="Search transactions..."
        className="border rounded-md p-2 w-full mb-4"
      />

      <table className="w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>

              <td>₹{item.amount}</td>

              <td>{item.type}</td>
              <td>
                <EditTransactionDialog transaction={item} />
              </td>
              <td>
                <button
                  onClick={async () => {
                    if (confirm("Delete this transaction?")) {
                      await api.delete(`/transactions/${item._id}`);

                      window.location.reload();
                    }
                  }}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
