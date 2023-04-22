import React, { Fragment, useEffect } from 'react';
import axios from 'common/utils/requestHelper';
import { AppActions } from 'common/types';
import { useTranslation } from 'react-i18next';
import { networkStatusOnline }  from 'common/utils/network'

type AllPagesProps = {
  actions: AppActions;
};

const AllPages: React.FC<AllPagesProps> = ({ actions }) => {
  const { i18n } = useTranslation();

  const getNetworkOnline = (s: any) => {
    let closedOrders = actions.orders.backOnline();
    if(closedOrders.length) console.log({closedOrders})
  }

  networkStatusOnline(getNetworkOnline);

  const getCategoriesAPI = async () => {
    let res: any = await axios.get('/categories');
    let updatedCategories = res.items.map((el: any) => {
      return {
        id: '' + el.id,
        name: el[`name_${i18n.language || 'en'}`],
        parentId: 'root',
        color: null,
        picture: null,
        isHidden: false,
        isDeleted: false,
        sortOrder: el.id,
        lastModifiedTime: Date.now(),
      };
    });
    return updatedCategories;
  };

  const getItemsAPI = async () => {
    let res: any = await axios.get('/items');
    let updatedItems = res.items.map((el: any) => {
      return {
        id: '' + el.id,
        name: el[`name_${i18n.language || 'en'}`],
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
    return updatedItems;
  };

  useEffect(() => {
    Promise.all([
      getCategoriesAPI(),
      getItemsAPI(),
    ])
    .then((res) => {
      actions.global.updateAll(res[0], res[1]);
    })
  }, []);

  return <></>;
};

export default AllPages;
