

import React from 'react'
import { Card } from "react-bootstrap";
export default function index({_cardName, children}) {
  return (
    <div>
        <Card>
            <Card.Header>
                {_cardName}
            </Card.Header>
            <Card.Body>
                       {children}
            </Card.Body>
        </Card>        
    </div>
  )
}
