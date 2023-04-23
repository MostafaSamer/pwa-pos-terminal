import React, { useEffect } from 'react';
import axios from 'common/utils/requestHelper';
import { AppActions } from 'common/types';
import { useTranslation } from 'react-i18next';
import { networkStatusOnline }  from 'common/utils/network'

type AllPagesProps = {
  actions: AppActions;
};

const AllPages: React.FC<AllPagesProps> = ({ actions }) => {
  const { i18n } = useTranslation();
  document.body.dir = i18n.language? i18n.dir() : 'ltr';

  const getNetworkOnline = (s: any) => {
    let closedOrder = actions.orders.backOnline();
    if(closedOrder.length) axios.post('/orders', closedOrder)
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
        parentId: el.parentid,
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

  const getSettingsAPI = async () => {
    // let res: any = await axios.get('/settings');
    if(true) i18n.changeLanguage('en');
    return {
      lang: 'en'
    }
  };

  useEffect(() => {
    Promise.all([
      getCategoriesAPI(),
      getItemsAPI(),
      getSettingsAPI(),
    ])
    .then((res) => {
      actions.global.updateAll(res[0], res[1], res[2]);
    })
  }, []);

  return <></>;
};

export default AllPages;
