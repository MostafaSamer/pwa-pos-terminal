import { Action, Item, GlobalActions, Category, Settings } from 'common/types';

export const createGlobalActions: Action<GlobalActions> = (state, updateState) => ({
  updateAll: (_categories: Category[], _items: Item[], settings: Partial<Settings>) => {
    updateState({ categories: _categories, items: [..._items], settings: {...state.settings, ...settings } });
  },
});
