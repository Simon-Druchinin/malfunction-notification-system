import { useState, useEffect } from "react"

import MalfunctionReportList from './MalfunctionReportList'
import { Row, Col } from "reactstrap"
import jwt_decode from "jwt-decode"
import useJwt, { JwtToken } from "@/auth/jwt/useJwt"
import { Can } from "@/utility/context/Can"

const Home = (): JSX.Element => {
  const { getToken } = useJwt()

  const decoded_token: JwtToken = jwt_decode(getToken() as string)
  const user_id = decoded_token.user_id

  return (
    <Row className="match-height">
      <Col md='6'>
        <MalfunctionReportList
          title={'Все Заявки'}
          icon={'Compass'}
          requestUrl={'/api/v1/schemas/malfunction-reports/'}
        />
      </Col>
      <Col md='6'>
        <MalfunctionReportList
          title={'Мои (Созданные) Заявки'}
          icon={'Edit'}
          requestUrl={`/api/v1/schemas/malfunction-reports/?created_by=${user_id}`}
        />
      </Col>
      <Can I='take' a='malfunctionreport'>
        <Col md='6'>
          <MalfunctionReportList
            title={'Мои (Рабочие) Заявки'}
            icon={'Activity'}
            requestUrl={`/api/v1/schemas/malfunction-reports/?taken_by=${user_id}`}
          />
        </Col>
      </Can>
    </Row>
  )
}

export default Home
