'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const InstallForm = () => {
  const [tenantName, setTenantName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRegister = () => {
    if (!tenantName || !email || !password || !confirmPassword) {
      setError('请填写所有字段')
      return
    }

    if (password !== confirmPassword) {
      setError('密码不匹配')
      return
    }

    setIsLoading(true)
    setError(null)

    // TODO: 调用注册 API
    setTimeout(() => {
      setIsLoading(false)
      // 注册完成跳转或显示提示
    }, 1000)
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      <h2 className="text-xl font-semibold">初始化系统</h2>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div>
        <Label htmlFor="tenantName" className="mb-2 block text-sm font-medium text-gray-700">组织名称</Label>
        <Input
          id="tenantName"
          value={tenantName}
          onChange={(e) => setTenantName(e.target.value)}
          placeholder="请输入组织或公司名称"
        />
      </div>

      <div>
        <Label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">管理员邮箱</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="请输入邮箱"
        />
      </div>

      <div>
        <Label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">设置密码</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="请输入密码"
        />
      </div>

      <div>
        <Label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-gray-700">确认密码</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="再次输入密码"
        />
      </div>

      <Button
        type="button"
        onClick={handleRegister}
        disabled={isLoading || !tenantName || !email || !password || !confirmPassword}
        className="w-full"
      >
        {isLoading ? '注册中...' : '注册系统'}
      </Button>
    </form>
  )
}

export default InstallForm
