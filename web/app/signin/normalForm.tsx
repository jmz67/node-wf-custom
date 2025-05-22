
import MailAndPasswordAuth from './components/mail-and-password-auth'


const NormalForm = () => {


    return <>
    <div className="w-full mx-auto mt-8">
        <div className="w-full mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900">欢迎登录工作流编辑页面！</h2>
            <p className='mt-2 mb-4 text-gray-500'>👋 今天有什么想创建的吗？</p>
        </div>
        <div>
            {/* sso 登录 */}
            <MailAndPasswordAuth />
        </div>
    </div>
    </>
}

export default NormalForm