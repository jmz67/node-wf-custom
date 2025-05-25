'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
// TODO: import Toast from '@/components/base/toast'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Label } from '@/app/components/ui/label'
import { useRouter } from 'next/navigation'

import { login } from '@/service/common'

import { emailRegex } from '@/config'

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/

export default function MailAndPasswordAuth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const isInvite = false
  const isEmailSetup = true
  const searchParams = useSearchParams()

  const handleEmailPasswordLogin = async () => {
    if (!email) {
      // Toast.notify({
      //   type: 'error',
      //   message: t('login.error.emailEmpty')
      // })
    }

    if (!emailRegex.test(email)) {
      // Toast.notify({
      //   type: 'error',
      //   message: t('login.error.emailInValid'),
      // })
      return 
    }

    if (!password?.trim()) {
      // Toast.notify({ type: 'error', message: t('login.error.passwordEmpty') })
      return
    }
    if (!passwordRegex.test(password)) {
      // Toast.notify({
      //   type: 'error',
      //   message: t('login.error.passwordInvalid'),
      // })
      return
    }

    try {
      setIsLoading(true)
      const loginData: Record<string, any> = {
        email, 
        password,
        remember_me: true
      }

      const res = await login({
        url: '/login',
        body: loginData,
      })

      if (res.result === 'sucess') {
        localStorage.setItem('console_token', res.data.access_token)
        localStorage.setItem('refresh_token', res.data.refresh_token)
        router.replace('/apps')
      }
    }
    finally {
      setIsLoading(false)
    }



  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      <div>
        <Label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
          邮箱
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="请输入你的邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isInvite}
          autoComplete="email"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            密码
          </Label>
          <Link
            href={`/reset-password?${searchParams.toString()}`}
            className={`text-sm ${isEmailSetup ? 'text-blue-600 hover:underline' : 'text-gray-400 cursor-not-allowed'}`}
            tabIndex={isEmailSetup ? 0 : -1}
            aria-disabled={!isEmailSetup}
          >
            忘记密码？
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="请输入密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEmailPasswordLogin()
            }}
            autoComplete="current-password"
            className="pr-10"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Button type="button" variant="ghost" onClick={() => setShowPassword(!showPassword)} size="sm">
              {showPassword ? '👀' : '😝'}
            </Button>
          </div>
        </div>
      </div>

      <div>
        <Button
          type="button"
          onClick={handleEmailPasswordLogin}
          disabled={isLoading || !email || !password}
          className="w-full"
        >
          登录
        </Button>
      </div>
    </form>
  )
}
