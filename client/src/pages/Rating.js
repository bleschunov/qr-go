import RatingList from "components/rating/RatingList"
import Title from "components/Title"

const Rating = () => {
    return (
        <div className="flex flex-col gap-8 py-6">
            <Title
                title="Рейтинг"
                subtitle="На каком ты месте?"
            />
            <RatingList />
        </div>
    )
}

export default Rating