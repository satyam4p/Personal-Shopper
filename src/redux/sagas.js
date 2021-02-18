import { all } from 'redux-saga/effects';
// import productSaga from './Product/saga';
import watchAddData from './StyleGroups/saga';
import watchFetchOrderDetails from './OrderDetails/saga';


export default function* rootSaga(getState) {
  yield all([watchAddData(),watchFetchOrderDetails()]);

}
