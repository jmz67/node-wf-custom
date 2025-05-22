'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function MailAndPasswordAuth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const isInvite = false
  const isEmailSetup = true
  const searchParams = useSearchParams()

  const handleEmailPasswordLogin = () => {
    setIsLoading(true)
    // TODO: 实现登录逻辑
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
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
