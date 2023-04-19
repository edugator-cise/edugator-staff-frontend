import { useEffect, useState } from "react";
import apiClient from "lib/api/apiClient";
import { FetchStatus } from "./types";
import { IAccount, IAccountsGET } from "components/Accounts/types";
import { apiRoutes } from "constants/apiRoutes";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  requestAccountsEnd,
  setCurrentAccount,
} from "state/AdminAccountsPage.slice";

export const useFetchAccount = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.loading);
  const [accounts, setAccounts] = useState<IAccountsGET | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const { data }: { data: IAccountsGET } = await apiClient.get(
        apiRoutes.admin.getAccounts
      );
      return data;
    };
    fetchData()
      .then((values) => {
        const { users, currentUser } = values;
        const currentAccount = users.find(
          (acc) => acc.username === currentUser
        );
        dispatch(requestAccountsEnd(users));
        dispatch(setCurrentAccount(currentAccount as IAccount));
        setAccounts(values);
        setStatus(FetchStatus.succeed);
      })
      .catch((e) => {
        toast.error(`Getting accounts failed ${e.message}`);
        setStatus(FetchStatus.failed);
        setError(e);
      });
  }, []);
  return { status, accounts, error };
};
