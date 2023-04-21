import { Action, Item, GlobalActions, Category } from 'common/types';

export const createGlobalActions: Action<GlobalActions> = (state, updateState) => ({
  updateAll: (_categories: Category[], _items: Item[]) => {
    updateState({ categories: _categories, items: [..._items] });
  },
});
