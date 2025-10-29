import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import { Eye, EyeOff, Lock, LogOut } from "lucide-react";

export default function Settings() {
  // Website info formData removed - not used anywhere

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { changePassword, logout } = useAuth();

  // Settings queries removed - not used anymore

  // Website settings loading removed - not used anywhere

  // Website settings save function removed - not used anywhere

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu xác nhận không khớp.",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu mới phải có ít nhất 6 ký tự.",
        variant: "destructive",
      });
      return;
    }

    try {
      const success = await changePassword(
        passwordData.oldPassword,
        passwordData.newPassword,
      );

      if (success) {
        toast({
          title: "Thành công!",
          description: "Mật khẩu đã được thay đổi.",
        });
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast({
          title: "Lỗi",
          description: "Mật khẩu hiện tại không đúng.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi đổi mật khẩu. Vui lòng thử lại.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      logout();
      toast({
        title: "Đã đăng xuất",
        description: "Bạn đã đăng xuất thành công.",
      });
    }
  };

  // Loading state removed - no settings to load

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Cài đặt hệ thống</h2>

      <div className="space-y-6">

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Bảo mật tài khoản</h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <Label htmlFor="oldPassword">Mật khẩu hiện tại</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="oldPassword"
                    type={showPasswords.old ? "text" : "password"}
                    value={passwordData.oldPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        oldPassword: e.target.value,
                      }))
                    }
                    placeholder="Nhập mật khẩu hiện tại"
                    className="pl-10 pr-10"
                    required
                    data-testid="input-old-password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({ ...prev, old: !prev.old }))
                    }
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    data-testid="toggle-old-password"
                  >
                    {showPasswords.old ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <Label htmlFor="newPassword">Mật khẩu mới</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="newPassword"
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    placeholder="Nhập mật khẩu mới"
                    className="pl-10 pr-10"
                    required
                    data-testid="input-new-password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({ ...prev, new: !prev.new }))
                    }
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    data-testid="toggle-new-password"
                  >
                    {showPasswords.new ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    placeholder="Xác nhận mật khẩu mới"
                    className="pl-10 pr-10"
                    required
                    data-testid="input-confirm-password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        confirm: !prev.confirm,
                      }))
                    }
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    data-testid="toggle-confirm-password"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button type="submit" data-testid="button-change-password">
                  Đổi mật khẩu
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleLogout}
                  data-testid="button-logout"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Đăng xuất
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
