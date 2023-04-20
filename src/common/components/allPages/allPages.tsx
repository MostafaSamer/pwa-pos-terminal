import React, { Fragment, useEffect } from 'react'
import axios from 'common/utils/requestHelper';
import { AppActions } from 'common/types';
import { useTranslation } from 'react-i18next';

type AllPagesProps = {
  actions: AppActions;
};

const AllPages: React.FC<AllPagesProps> = ({ actions }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    axios.get('/items')
    .then((res: any) => {
      let updatedItems = res.items
      .map((el: any) => {
        return {
          "id": ""+el.id,
          "name": el[`name_${i18n.language}`],
          "barcode": "",
          "color": el.color,
          "extras": [],
          "hasModificationsPrices": false,
          "modifications": [],
          "parentId": "root",
          "picture": el.picture,
          "price": el.price,
          "costPrice": el.price,
          "sortOrder": el.price,
          "unit": "",
          "isHidden": false,
          "isNonDiscounted": false,
          "isWeighing": false,
          "lastModifiedTime": 1681958074977,
          "isDeleted": false,
          "cookingTime": 0,
          "taxes": []
        }
      })
      actions.item.updateAll(updatedItems)
    })
  }, []);

  return <></>;
};

export default AllPages;
