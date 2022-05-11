import Hero from "components/Hero"
import UploadAvatar from "components/settings/UploadAvatar"
import Divider from "components/Divider"
import BadButtons from "components/settings/BadButtons"
import Title from "components/Title"
import ChangeName from "components/settings/ChangeName"
import ChangeLogin from "components/settings/ChangeLogin"
import ChangePassword from "components/settings/ChangePassword"

const Settings = () => {
    
    return (
        <> 
            <Hero />
            <div className="flex flex-col gap-8">
                <Title className="pt-6" title="Настройки профиля" subtitle="Жизнь меняется, мы меняемся" />
                <ChangeName />
                <Divider />
                <ChangeLogin />
                <Divider />
                <UploadAvatar />
                <Divider />
                <ChangePassword />
                <Divider />
                <BadButtons className="pb-6" />
            </div>
        </>
    )
}

export default Settings