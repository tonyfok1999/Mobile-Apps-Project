// /** @jsxImportSource @emotion/react */
// import { css } from '@emotion/react'
// import React from 'react'

// import { useAppSelector } from '../store'

// function OrderContainer(props: { orderInfo: OrderInfo, referenceTable: ReferenceTable }) {
// 	const userId = useAppSelector((state) => state.auth.user!.id)
	
// 	return (
// 		<>
// 			<NavLink
// 							key={orderInfo.id}
// 							to={`/orderDetailPage/${orderInfo.id}`}>
// 							<div className='order'>
// 								<div className='address'>
// 									{orderInfo.working_address}
// 								</div>
// 								<div className='orderId'>{orderInfo.id}</div>
// 								<div className='service'>
// 									服務範圍
// 									<span>
// 										{referenceTable &&
// 											referenceTable[1].filter(
// 												(type) =>
// 													type.id ==
// 													referenceTable![2].filter(
// 														(subType) =>
// 															subType.id ==
// 															orderInfo.service_subtype_id
// 													)[0].service_type_id
// 											)[0].type}
// 									</span>
// 								</div>
// 								<div className='type'>
// 									維修類別
// 									<span className='btn btn-outline-danger'>
// 										{referenceTable &&
// 											referenceTable[2].filter(
// 												(subType) =>
// 													subType.id ==
// 													orderInfo.service_subtype_id
// 											)[0].subtype}
// 									</span>
// 								</div>
// 								<div className='budget'>
// 									預算<span>${orderInfo.budget}</span>
// 								</div>
// 								<button
// 									onClick={() => {
// 										history.replace('/tabs/chatlist')
// 									}}>
// 									聯絡客戶
// 								</button>
// 							</div>
// 						</NavLink>
// 		</>
// 	)
// }

// export default OrderContainer