import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { useState } from "react";

const GroupCard = (props) => {


    const colors = [
        {
            id: 0,
            value: "ForestGreen"
        },
        {
            id: 1,
            value: "red"
        },
        {
            id: 2,
            value: "teal"
        },
        {
            id: 3,
            value: "plum"
        },
        {
            id: 4,
            value: "indigo"
        },
        {
            id: 5,
            value: "coral"
        },
        {
            id: 6,
            value: "skyblue"
        },
        {
            id: 7,
            value: "gold"
        },
        {
            id: 8,
            value: "hotpink"
        },
        {
            id: 9,
            value: "darkslategrey"
        },
        {
            id: 10,
            value: "coral"
        },
        {
            id: 11,
            value: "dodgerblue"
        },
        {
            id: 12,
            value: "lightseagreen"
        },
        {
            id: 13,
            value: "orangered"
        },
        {
            id: 14,
            value: "saddlebrown"
        },

    ]
    const [color, setColor] = useState(colors[props.counter].value)

    const HandleColorChange = () => {
        if(props.counter > 13){
            setColor(colors[2].value)
        }
        setColor(colors[props.counter].value)

        
    }

    return (
        <Link to={`/groups/${props.groupData.id}/calendar`} style={{textDecoration: 'none', paddingTop: "20px"}}>
            <Card className="text-center">
                <Card.Header style={{backgroundColor:color, padding: "10px"}}></Card.Header>
                <Card.Title style={{color:color, WebkitTextStroke:"1px black"}}as="h1" className="lg-3">{props.groupData.group_title}</Card.Title>
                <Card.Body style={{color: "black"}} as="h5">{props.groupData.group_description}</Card.Body>
                <HandleColorChange/>
            </Card>
        </Link>
    )

}

export default GroupCard;