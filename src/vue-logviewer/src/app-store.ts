import Vuex, { StoreOptions } from "vuex";
import { AppState } from "./app-state";

const items: string[] = [];
for (let index = 0; index < 10; index++) {
  items.push("test blablabla");
}

export default new Vuex.Store<AppState>({
  state: {
    entries: items
  },
  mutations: {
    addLog(state: AppState, log: string) {
      state.entries.push(log);
    }
  }
});
