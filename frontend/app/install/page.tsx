import InstallForm from './installForm'
import Header from '@/signin/_header'
import cn from '@/utils/classnames'

const Install = () => {
  return (
    <div className={cn('min-h-screen flex')}>
        {/* 左侧：品牌/介绍区域 */}
        <div className="w-1/3 bg-slate-100 flex flex-col justify-center items-center px-12">
            
            {/* 可以在这里放 logo 和宣传图 */}
            {/* <img src="/your-logo.svg" alt="Logo" className="w-32 mb-8" />
            <img src="/illustration.svg" alt="Illustration" className="max-w-md" /> */}
        
            <p className="mt-6 text-center text-gray-600 text-sm">
            “越用越好用，我说的不只是使用体验，也是对未来的期待。”
            </p>
        </div>

        {/* 右侧：注册表单区域 */}
        <div className="w-2/3 bg-white flex flex-col relative px-12 py-8">
            {/* 内容垂直居中容器 */}
            <div className="flex-grow flex items-center justify-center">
                <div className="max-w-md w-full mx-auto">
                <InstallForm />
                </div>
            </div>

            {/* 固定底部说明 */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-gray-400 text-xs">
                登录即表示您已阅读并同意我们的
                <a href="/terms" className="text-blue-600 hover:underline mx-1">服务条款</a>
                和
                <a href="/privacy" className="text-blue-600 hover:underline mx-1">隐私政策</a>
            </div>
        </div>

    </div>
  )
}

export default Install
