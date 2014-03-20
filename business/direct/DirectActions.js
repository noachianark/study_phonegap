Ext.namespace( 'Ext.app');

Ext.app.PROVIDER_BASE_URL=window.location.protocol + '//' + window.location.host + '/' + (window.location.pathname.split('/').length>2 ? window.location.pathname.split('/')[1]+ '/' : '')  + 'djn/directprovider';

Ext.app.POLLING_URLS = {
}

Ext.app.REMOTING_API = {
  url: Ext.app.PROVIDER_BASE_URL,
  type: 'remoting',
  actions: {
    BusinessConfigurationAction: [
      {
        name: 'saveConfiguration',
        len: 1,
        formHandler: false
      },
      {
        name: 'getConfigurations',
        len: 1,
        formHandler: false
      }
    ],
    TransactionAction: [
      {
        name: 'consumeFromDeposit',
        len: 1,
        formHandler: false
      },
      {
        name: 'exchangePoint',
        len: 1,
        formHandler: false
      },
      {
        name: 'findOpintHistories',
        len: 1,
        formHandler: false
      },
      {
        name: 'deposit',
        len: 1,
        formHandler: false
      },
      {
        name: 'withdraw',
        len: 1,
        formHandler: false
      },
      {
        name: 'findWithdrawHistories',
        len: 1,
        formHandler: false
      },
      {
        name: 'findDepositHistories',
        len: 1,
        formHandler: false
      },
      {
        name: 'findConsumeHistories',
        len: 1,
        formHandler: false
      },
      {
        name: 'consume',
        len: 1,
        formHandler: false
      }
    ],
    OperatorRuleAction: [
      {
        name: 'deleteOperatorRule',
        len: 1,
        formHandler: false
      },
      {
        name: 'addOperatorRule',
        len: 1,
        formHandler: false
      },
      {
        name: 'findActions',
        len: 0,
        formHandler: false
      },
      {
        name: 'listAsOption',
        len: 1,
        formHandler: false
      },
      {
        name: 'updateOperatorRule',
        len: 1,
        formHandler: false
      },
      {
        name: 'findOperatorRules',
        len: 1,
        formHandler: false
      },
      {
        name: 'getOperatorRuleOptions',
        len: 1,
        formHandler: false
      },
      {
        name: 'findOperatorRuleById',
        len: 1,
        formHandler: false
      }
    ],
    MessageAction: [
      {
        name: 'deleteNewsPictures',
        len: 1,
        formHandler: false
      },
      {
        name: 'updateNewsPictures',
        len: 3,
        formHandler: false
      },
      {
        name: 'publisNews',
        len: 1,
        formHandler: false
      },
      {
        name: 'deleteCoupon',
        len: 1,
        formHandler: false
      },
      {
        name: 'findCoupons',
        len: 1,
        formHandler: false
      },
      {
        name: 'findCouponById',
        len: 1,
        formHandler: false
      },
      {
        name: 'editCoupon',
        len: 1,
        formHandler: false
      },
      {
        name: 'deleteNews',
        len: 1,
        formHandler: false
      },
      {
        name: 'deleteCouponPictures',
        len: 1,
        formHandler: false
      },
      {
        name: 'addNewsPictures',
        len: 3,
        formHandler: false
      },
      {
        name: 'addCouponPictures',
        len: 3,
        formHandler: false
      },
      {
        name: 'updateCouponPictures',
        len: 3,
        formHandler: false
      },
      {
        name: 'findNews',
        len: 1,
        formHandler: false
      },
      {
        name: 'findNewsById',
        len: 1,
        formHandler: false
      },
      {
        name: 'editNews',
        len: 1,
        formHandler: false
      },
      {
        name: 'publisCoupon',
        len: 1,
        formHandler: false
      }
    ],
    CardTypeAction: [
      {
        name: 'deleteCardTypeById',
        len: 1,
        formHandler: false
      },
      {
        name: 'getCardTypeById',
        len: 1,
        formHandler: false
      },
      {
        name: 'getRestCardTypeOptions',
        len: 1,
        formHandler: false
      },
      {
        name: 'getCardTypeOptions',
        len: 1,
        formHandler: false
      },
      {
        name: 'addCardType',
        len: 1,
        formHandler: false
      },
      {
        name: 'switchAllUserToNewVIPCardType',
        len: 2,
        formHandler: false
      },
      {
        name: 'setDefaultCardType',
        len: 2,
        formHandler: false
      },
      {
        name: 'findCardTypes',
        len: 1,
        formHandler: false
      },
      {
        name: 'countAllUsersForCardType',
        len: 1,
        formHandler: false
      },
      {
        name: 'updateCardType',
        len: 1,
        formHandler: false
      }
    ],
    OperatorAction: [
      {
        name: 'updateOperator',
        len: 1,
        formHandler: false
      },
      {
        name: 'findOperators',
        len: 1,
        formHandler: false
      },
      {
        name: 'logout',
        len: 0,
        formHandler: false
      },
      {
        name: 'getOperatorOptions',
        len: 1,
        formHandler: false
      },
      {
        name: 'deleteOperator',
        len: 1,
        formHandler: false
      },
      {
        name: 'getLoginInfos',
        len: 0,
        formHandler: false
      },
      {
        name: 'getOperatorById',
        len: 1,
        formHandler: false
      },
      {
        name: 'login',
        len: 3,
        formHandler: false
      },
      {
        name: 'changePassword',
        len: 3,
        formHandler: false
      },
      {
        name: 'addOperator',
        len: 1,
        formHandler: false
      }
    ],
    BusinessAdminAction: [
      {
        name: 'findBusinessAdmins',
        len: 1,
        formHandler: false
      },
      {
        name: 'logout',
        len: 0,
        formHandler: false
      },
      {
        name: 'updateBusinessAdmin',
        len: 1,
        formHandler: false
      },
      {
        name: 'findBusinessAdminById',
        len: 1,
        formHandler: false
      },
      {
        name: 'getBusinessAdminOptions',
        len: 1,
        formHandler: false
      },
      {
        name: 'getLoginInfos',
        len: 0,
        formHandler: false
      },
      {
        name: 'login',
        len: 3,
        formHandler: false
      },
      {
        name: 'addBusinessAdmin',
        len: 1,
        formHandler: false
      },
      {
        name: 'removeBusinessAdmin',
        len: 1,
        formHandler: false
      }
    ],
    BusinessLogAction: [
      {
        name: 'findOperatorLogs',
        len: 1,
        formHandler: false
      },
      {
        name: 'findBusinessAdminLogs',
        len: 1,
        formHandler: false
      }
    ],
    BVipCardAction: [
      {
        name: 'getConsumeGroupByMonth',
        len: 1,
        formHandler: false
      },
      {
        name: 'getVipCardByQRString',
        len: 1,
        formHandler: false
      },
      {
        name: 'changeVipCardTypeAsBulk',
        len: 2,
        formHandler: false
      },
      {
        name: 'getVipCardIdByQrString',
        len: 2,
        formHandler: false
      },
      {
        name: 'findVipCards',
        len: 1,
        formHandler: false
      },
      {
        name: 'changeVipCardType',
        len: 2,
        formHandler: false
      },
      {
        name: 'getVipCardById',
        len: 1,
        formHandler: false
      }
    ],
    ShopAction: [
      {
        name: 'listAsOption',
        len: 1,
        formHandler: false
      },
      {
        name: 'deleteShop',
        len: 1,
        formHandler: false
      },
      {
        name: 'findShopById',
        len: 1,
        formHandler: false
      },
      {
        name: 'editShop',
        len: 1,
        formHandler: false
      },
      {
        name: 'list',
        len: 1,
        formHandler: false
      },
      {
        name: 'addShop',
        len: 1,
        formHandler: false
      }
    ]
  }
}

