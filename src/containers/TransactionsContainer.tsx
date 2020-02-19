import React from "react";
import { connect } from "react-redux";
import MainContainer from "./MainContainer";
import { IRootReducerState } from "../reducers";
import { TransactionResponseItem } from "../models";
import { useRouteMatch } from "react-router";
import PublicTransactions from "../components/PublicTransactions";
import TransactionList from "../components/TransactionList";
import TransactionNavTabs from "../components/TransactionNavTabs";
import TransactionListFilters from "../components/TransactionListFilters";
import {
  transactionsPublicPending,
  transactionsPersonalPending,
  transactionsContactsPending
} from "../actions/transactions";

export interface DispatchProps {
  filterPublicTransactions: Function;
  filterPersonalTransactions: Function;
  filterContactTransactions: Function;
}

export interface StateProps {
  publicTransactions: {
    contacts: TransactionResponseItem[];
    public: TransactionResponseItem[];
  };
  contactsTransactions: TransactionResponseItem[];
  personalTransactions: TransactionResponseItem[];
}

export type TransactionsContainerProps = StateProps & DispatchProps;

const TransactionsContainer: React.FC<TransactionsContainerProps> = ({
  publicTransactions,
  contactsTransactions,
  personalTransactions,
  filterPublicTransactions,
  filterPersonalTransactions,
  filterContactTransactions
}) => {
  const match = useRouteMatch();

  if (match.url === "/contacts") {
    return (
      <MainContainer>
        <TransactionNavTabs />
        <TransactionListFilters
          filterTransactions={filterContactTransactions}
        />
        <br />
        <TransactionList
          header="Contacts"
          transactions={contactsTransactions}
        />
      </MainContainer>
    );
  }

  if (match.url === "/personal") {
    return (
      <MainContainer>
        <TransactionNavTabs />
        <TransactionListFilters
          filterTransactions={filterPersonalTransactions}
        />
        <br />
        <TransactionList
          header="Personal"
          transactions={personalTransactions}
        />
      </MainContainer>
    );
  }

  // match.url "/" or "/public"
  return (
    <MainContainer>
      <TransactionNavTabs />
      <TransactionListFilters filterTransactions={filterPublicTransactions} />
      <br />
      <PublicTransactions transactions={publicTransactions} />
    </MainContainer>
  );
};

const mapStateToProps = (state: IRootReducerState) => ({
  publicTransactions: state.transactions.public,
  contactsTransactions: state.transactions.contacts,
  personalTransactions: state.transactions.personal
});

const mapDispatchToProps = {
  filterPublicTransactions: transactionsPublicPending,
  filterPersonalTransactions: transactionsPersonalPending,
  filterContactTransactions: transactionsContactsPending
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsContainer);
