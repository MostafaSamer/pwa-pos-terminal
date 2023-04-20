import React, { Fragment, useEffect } from 'react';
import axios from 'common/utils/requestHelper';
import { AppActions } from 'common/types';
import { useTranslation } from 'react-i18next';

type AllPagesProps = {
  actions: AppActions;
};

const AllPages: React.FC<AllPagesProps> = ({ actions }) => {
  const { i18n } = useTranslation();

  const getCategoriesAPI = () => {
    axios.get('/categories').then((res: any) => {
      let updatedCategories = res.items.map((el: any) => {
        console.log({el})
        return {
          id: '' + el.id,
          name: el[`name_${i18n.language}`],
          parentId: 'root',
          color: null,
          picture: null,
          isHidden: false,
          isDeleted: false,
          sortOrder: el.id,
          lastModifiedTime: Date.now(),
        };
      });
      actions.category.updateAll(updatedCategories);
    });
  };

  const getItemsAPI = () => {
    axios.get('/items').then((res: any) => {
      let updatedItems = res.items.map((el: any) => {
        return {
          id: '' + el.id,
          name: el[`name_${i18n.language}`],
          barcode: '',
          color: el.color,
          extras: [],
          hasModificationsPrices: false,
          modifications: [],
          parentId: 'root',
          picture: el.picture,
          price: el.price,
          costPrice: el.price,
          sortOrder: el.price,
          unit: '',
          isHidden: false,
          isNonDiscounted: false,
          isWeighing: false,
          lastModifiedTime: Date.now(),
          isDeleted: false,
          cookingTime: 0,
          taxes: [],
        };
      });
      actions.item.updateAll(updatedItems);
    });
  };

  useEffect(() => {
    getCategoriesAPI();
    getItemsAPI();
  }, []);

  return <></>;
};

export default AllPages;
