/**********************************************************************
 * 
 * Code generated automatically by DirectJNgine
 * Copyright (c) 2009, Pedro Agulló Soliveres
 * 
 * DO NOT MODIFY MANUALLY!!
 * 
 **********************************************************************/

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
        name: 'saveConfiguration'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'getConfigurations'/*(String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      }
    ],
    TransactionAction: [
      {
        name: 'consumeFromDeposit'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'exchangePoint'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'findOpintHistories'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'deposit'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'withdraw'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'findWithdrawHistories'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'findDepositHistories'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'findConsumeHistories'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'consume'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      }
    ],
    OperatorRuleAction: [
      {
        name: 'deleteOperatorRule'/*(String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'addOperatorRule'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'findActions'/*() => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 0,
        formHandler: false
      },
      {
        name: 'listAsOption'/*(java.util.Map) => java.util.List */,
        len: 1,
        formHandler: false
      },
      {
        name: 'updateOperatorRule'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'findOperatorRules'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'getOperatorRuleOptions'/*(java.util.Map) => java.util.List */,
        len: 1,
        formHandler: false
      },
      {
        name: 'findOperatorRuleById'/*(String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      }
    ],
    MessageAction: [
      {
        name: 'deleteNewsPictures'/*(String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'updateNewsPictures'/*(String, String, String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 3,
        formHandler: false
      },
      {
        name: 'publisNews'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'deleteCoupon'/*(String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'findCoupons'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'findCouponById'/*(String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'editCoupon'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'deleteNews'/*(String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'deleteCouponPictures'/*(String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'addNewsPictures'/*(String, String, String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 3,
        formHandler: false
      },
      {
        name: 'addCouponPictures'/*(String, String, String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 3,
        formHandler: false
      },
      {
        name: 'updateCouponPictures'/*(String, String, String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 3,
        formHandler: false
      },
      {
        name: 'findNews'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'findNewsById'/*(String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'editNews'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'publisCoupon'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      }
    ],
    CardTypeAction: [
      {
        name: 'deleteCardTypeById'/*(String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'getCardTypeById'/*(String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'getRestCardTypeOptions'/*(java.util.Map) => java.util.List */,
        len: 1,
        formHandler: false
      },
      {
        name: 'getCardTypeOptions'/*(java.util.Map) => java.util.List */,
        len: 1,
        formHandler: false
      },
      {
        name: 'addCardType'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'switchAllUserToNewVIPCardType'/*(String, String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 2,
        formHandler: false
      },
      {
        name: 'setDefaultCardType'/*(String, String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 2,
        formHandler: false
      },
      {
        name: 'findCardTypes'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'countAllUsersForCardType'/*(String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'updateCardType'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      }
    ],
    OperatorAction: [
      {
        name: 'updateOperator'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'findOperators'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'logout'/*() => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 0,
        formHandler: false
      },
      {
        name: 'getOperatorOptions'/*(java.util.Map) => java.util.List */,
        len: 1,
        formHandler: false
      },
      {
        name: 'deleteOperator'/*(String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'getLoginInfos'/*() => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 0,
        formHandler: false
      },
      {
        name: 'getOperatorById'/*(String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'login'/*(String, String, String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 3,
        formHandler: false
      },
      {
        name: 'changePassword'/*(String, String, String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 3,
        formHandler: false
      },
      {
        name: 'addOperator'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      }
    ],
    BusinessAdminAction: [
      {
        name: 'findBusinessAdmins'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'logout'/*() => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 0,
        formHandler: false
      },
      {
        name: 'updateBusinessAdmin'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'findBusinessAdminById'/*(String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'getBusinessAdminOptions'/*(java.util.Map) => java.util.List */,
        len: 1,
        formHandler: false
      },
      {
        name: 'getLoginInfos'/*() => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 0,
        formHandler: false
      },
      {
        name: 'login'/*(String, String, String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 3,
        formHandler: false
      },
      {
        name: 'addBusinessAdmin'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'removeBusinessAdmin'/*(String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      }
    ],
    BusinessLogAction: [
      {
        name: 'findOperatorLogs'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'findBusinessAdminLogs'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      }
    ],
    BVipCardAction: [
      {
        name: 'getConsumeGroupByMonth'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'getVipCardByQRString'/*(String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'changeVipCardTypeAsBulk'/*(String[], String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 2,
        formHandler: false
      },
      {
        name: 'getVipCardIdByQrString'/*(String, String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 2,
        formHandler: false
      },
      {
        name: 'findVipCards'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'changeVipCardType'/*(String, String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 2,
        formHandler: false
      },
      {
        name: 'getVipCardById'/*(String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      }
    ],
    ShopAction: [
      {
        name: 'listAsOption'/*(java.util.Map) => java.util.List */,
        len: 1,
        formHandler: false
      },
      {
        name: 'deleteShop'/*(String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'findShopById'/*(String) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'editShop'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'list'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      },
      {
        name: 'addShop'/*(java.util.Map) => com.zetian.vipmonk.action.actionmodel.BaseResult */,
        len: 1,
        formHandler: false
      }
    ]
  }
}

