import { Action, Item, GlobalActions, Category } from 'common/types';

export const createGlobalActions: Action<GlobalActions> = (state, updateState) => ({
  updateAll: (_items: Item[], _categories: Category[]) => {
    updateState({ items: [..._items], categories: _categories });
  },
});
