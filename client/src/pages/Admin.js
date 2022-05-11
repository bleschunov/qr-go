import Title from "components/Title"
import LocationList from "components/admin/LocationList"

const Admin = () => {
    return (
        <div className="flex flex-col gap-8 py-6">
            <Title
                title="Редактирование локаций"
                subtitle="Прояви фантазию"
            />
            <LocationList />
        </div>
    )
}

export default Admin