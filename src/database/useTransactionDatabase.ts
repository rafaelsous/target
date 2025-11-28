import { useSQLiteContext } from "expo-sqlite";

export type TransactionCreate = {
  target_id: number;
  amount: number;
  observation?: string;
};

export type TransactionResponse = TransactionCreate & {
  id: number;
  created_at: Date;
  updated_at: Date;
};

export function useTransactionDatabase() {
  const database = useSQLiteContext();

  async function create(data: TransactionCreate) {
    const statement = await database.prepareAsync(`
      INSERT INTO transactions 
        (target_id, amount, observation) 
      VALUES 
        ($target_id, $amount, $observation)
    `);

    statement.executeAsync({
      $target_id: data.target_id,
      $amount: data.amount,
      $observation: data.observation ? data.observation : null,
    });
  }

  function listByTargetId(target_id: number): Promise<TransactionResponse[]> {
    return database.getAllAsync<TransactionResponse>(`
      SELECT * 
      FROM transactions 
      WHERE target_id = ${target_id}
      ORDER BY created_at DESC
    `);
  }

  return {
    create,
    listByTargetId,
  };
}
