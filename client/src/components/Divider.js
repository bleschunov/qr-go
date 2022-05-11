import Container from "./Container"

const Divider = ({ className }) => {
    return (
        <Container>
            <div className={`${className} h-px bg-gray-200 w-full`}></div>
        </Container>
    )
}

export default Divider