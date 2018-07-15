import Vuex, { StoreOptions } from "vuex";
import { AppState } from "./app-state";

import TestData from "../test-data.json";

export default new Vuex.Store<AppState>({
  state: {
    entries: TestData.logs
  },
  mutations: {
    addLog(state: AppState, log: string) {
      state.entries.push(log);
    }
  }
});
