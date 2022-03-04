import {
  USER_LOGIN,
  USER_LOGOUT,
  GET_PACKAGES,
  UPDATE_USER_DATA,
  USER_SIGNUP,
  SAVE_USER_COORDS,
  IS_VALID_SIGNUP_OTP,
  IS_VALID_RESET_PASS_OTP,
  GET_LANGUAGES,
  RESET_PASSWORD,
  HAS_NETOWRK_ERROR,
  LOGIN_FAILED,
  GET_CURRENT_LOC,
  UPDATE_PHOTO,
  CHANGE_PASSWORD,
  ERROR_MODAL,
  PACKAGE_MODIFIED,
  CANCEL_SUBSCRIPTION,
  TOGGLE_FCM_NOTIFICATION,
  GET_OCCASIONS,
  GET_CURRENT_BOOKING,
  GET_BOOKING_HISTORY,
  COMPLETE_BOOKING,
  SKIP_BUY_PACKAGE,
} from '../actions/actionType';

const initialData = {
  isUserLogin: false,
  loginFailed: {
    status: false,
    msg: '',
  },
  userData: null,
  accessToken: '',
  coords: {
    lat: null,
    lng: null
  },
  isValidOtp: false,
  isValidResetPassOtp: false,
  statusCode: null,
  isResetPasswordSuccess: false,
  errorModal: {
    status: false,
    msg: '',
  },
  hasSubscribedToFCMNotification: true,
  loading: false,
  packages: [],
  languages: [],
  occassions: [],
  currentBooking: null,
  bookingHistory: [],
};

export function UserReducer(state = initialData, action) {
  switch (action.type) {
    case COMPLETE_BOOKING:
      return {
        ...state,
        errorModal: {
          status: false,
          msg: '',
        },
        currentBooking: null,
      };

    case GET_BOOKING_HISTORY:
      return {
        ...state,
        bookingHistory: action.payload,
      };

    case GET_CURRENT_BOOKING:
      return {
        ...state,
        currentBooking: action.payload,
      };

    case GET_OCCASIONS:
      return {
        ...state,
        occasions: action.payload,
      };

    case TOGGLE_FCM_NOTIFICATION:
      return {
        ...state,
        hasSubscribedToFCMNotification: action.payload,
      };

    case CANCEL_SUBSCRIPTION:
      return {
        ...state,

        userData: {
          ...state.userData,
          ...action.payload,
        },
      };
    case GET_CURRENT_LOC:
      return {
        ...state,
        coords: action.payload,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        loginFailed: {
          status: true,
          msg: action.payload,
        },
      };

    case USER_LOGIN:
      return {
        ...state,
        loginFailed: {
          status: false,
          msg: '',
        },
        ...action.payload,
      };

    case ERROR_MODAL:
      return {
        ...state,
        errorModal: action.payload,
      };

    case USER_LOGOUT:
      return {
        ...initialData,
      };

    case GET_PACKAGES:
      return {
        ...state,
        ...action.payload,
      };

    case PACKAGE_MODIFIED:
      return {
        ...state,
        errorModal: {
          status: false,
          msg: '',
        },
        isUserLogin: true,
        userData: {
          ...state.userData,
          current_package: action.payload,
        },
      };

    case GET_LANGUAGES:
      return {
        ...state,
        ...action.payload,
      };

    case UPDATE_USER_DATA:
      return {
        ...state,
        loginFailed: {
          status: false,
          msg: '',
        },
        userData: {
          ...action.payload,
        },
      };

    case UPDATE_PHOTO:
      return {
        ...state,
        loginFailed: {
          status: false,
          msg: '',
        },
        userData: {
          ...state.userData,
          profile_image: action.payload,
        },
      };

    case USER_SIGNUP:
      return {
        ...state,
        ...action.payload,
        loginFailed: {
          status: false,
          msg: '',
        },
        errorModal: {
          msg: '',
          status: false,
        },
      };

    case SAVE_USER_COORDS:
      return {
        ...state,
        coords: action.payload,
      };

    case IS_VALID_SIGNUP_OTP:
      return {
        ...state,
        // isValidOtp: true,
        userData: action.payload,
        // isUserLogin: true,
        accessToken: action.payload.token,
      };

    case SKIP_BUY_PACKAGE:
      return {
        ...state,
        isUserLogin: true,
      };

    case IS_VALID_RESET_PASS_OTP:
      return {
        ...state,
        isValidResetPassOtp: true,
        userData: action.payload.data,
      };

    case RESET_PASSWORD:
      return {
        ...state,
        isValidResetPassOtp: false,
        userData: null,
      };

    case HAS_NETOWRK_ERROR:
      return {
        ...state,
        isValidResetPassOtp: false,
      };
    default:
      return state;
  }
}
