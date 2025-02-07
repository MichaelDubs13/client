import ListGroup from "./ListGroup";


const ListSection = ({section})=>{
return (
    <>
        <h2>{section.heading}</h2>
        {   
            section.groups.map((group, index) => (
                <ListGroup item={group}/>
        ))}
    </>
)
}

export default ListSection;