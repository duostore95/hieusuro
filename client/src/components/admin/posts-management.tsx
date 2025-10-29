import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MarkdownEditor } from "@/components/ui/markdown-editor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { BlogPost, insertBlogPostSchema } from "@shared/schema";
import { z } from "zod";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

export default function PostsManagement() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    imageUrl: "",
    status: "published" as "published" | "draft",
    showInBlog: true,
    showInNguoiMoi: false,
    moduleId: undefined as number | undefined,
    moduleName: undefined as string | undefined,
    lessonOrder: undefined as number | undefined,
    duration: undefined as string | undefined,
    objectives: [""] as string[],
    actionSteps: [""] as string[],
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/posts"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: z.infer<typeof insertBlogPostSchema>) => {
      return await apiRequest("POST", "/api/posts", data);
    },
    onSuccess: () => {
      toast({ title: "Thành công!", description: "Bài viết đã được tạo." });
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      resetForm();
    },
    onError: () => {
      toast({ title: "Lỗi", description: "Không thể tạo bài viết.", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<z.infer<typeof insertBlogPostSchema>> }) => {
      return await apiRequest("PUT", `/api/posts/${id}`, data);
    },
    onSuccess: () => {
      toast({ title: "Thành công!", description: "Bài viết đã được cập nhật." });
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      resetForm();
    },
    onError: () => {
      toast({ title: "Lỗi", description: "Không thể cập nhật bài viết.", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/posts/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Thành công!", description: "Bài viết đã được xóa." });
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
    onError: () => {
      toast({ title: "Lỗi", description: "Không thể xóa bài viết.", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({ 
      title: "", 
      excerpt: "", 
      content: "", 
      imageUrl: "", 
      status: "published",
      showInBlog: true,
      showInNguoiMoi: false,
      moduleId: undefined,
      moduleName: undefined,
      lessonOrder: undefined,
      duration: undefined,
      objectives: [""],
      actionSteps: [""],
    });
    setEditingPost(null);
    setIsCreateModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const filteredObjectives = formData.objectives.filter(obj => obj.trim() !== "");
      const filteredActionSteps = formData.actionSteps.filter(step => step.trim() !== "");
      
      const submitData = {
        ...formData,
        objectives: filteredObjectives.length > 0 ? filteredObjectives : undefined,
        actionSteps: filteredActionSteps.length > 0 ? filteredActionSteps : undefined,
        // Clear nguoi-moi fields when unchecked
        ...(formData.showInNguoiMoi === false ? {
          moduleId: undefined,
          moduleName: undefined,
          lessonOrder: undefined,
          duration: undefined,
          objectives: undefined,
          actionSteps: undefined,
        } : {}),
      };
      
      const validatedData = insertBlogPostSchema.parse(submitData);
      
      if (editingPost) {
        updateMutation.mutate({ id: editingPost.id, data: validatedData });
      } else {
        createMutation.mutate(validatedData);
      }
    } catch (error) {
      toast({ title: "Lỗi", description: "Dữ liệu không hợp lệ.", variant: "destructive" });
    }
  };

  const startEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl || "",
      status: post.status as "published" | "draft",
      showInBlog: post.showInBlog ?? true,
      showInNguoiMoi: post.showInNguoiMoi ?? false,
      moduleId: post.moduleId ?? undefined,
      moduleName: post.moduleName ?? undefined,
      lessonOrder: post.lessonOrder ?? undefined,
      duration: post.duration ?? undefined,
      objectives: post.objectives && post.objectives.length > 0 ? post.objectives : [""],
      actionSteps: post.actionSteps && post.actionSteps.length > 0 ? post.actionSteps : [""],
    });
    setIsCreateModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      deleteMutation.mutate(id);
    }
  };

  const addObjective = () => {
    setFormData(prev => ({ ...prev, objectives: [...prev.objectives, ""] }));
  };

  const removeObjective = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      objectives: prev.objectives.filter((_, i) => i !== index) 
    }));
  };

  const updateObjective = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.map((obj, i) => i === index ? value : obj)
    }));
  };

  const addActionStep = () => {
    setFormData(prev => ({ ...prev, actionSteps: [...prev.actionSteps, ""] }));
  };

  const removeActionStep = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      actionSteps: prev.actionSteps.filter((_, i) => i !== index) 
    }));
  };

  const updateActionStep = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      actionSteps: prev.actionSteps.map((step, i) => i === index ? value : step)
    }));
  };

  if (isLoading) {
    return (
      <div className="flex-1 space-y-8 p-8">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-muted animate-pulse rounded"></div>
          <div className="h-10 w-32 bg-muted animate-pulse rounded"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-lg animate-pulse">
              <div className="space-y-2">
                <div className="h-5 w-64 bg-muted rounded"></div>
                <div className="h-4 w-48 bg-muted rounded"></div>
              </div>
              <div className="flex space-x-2">
                <div className="h-10 w-10 bg-muted rounded"></div>
                <div className="h-10 w-10 bg-muted rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Quản lý bài viết</h2>
          <p className="text-muted-foreground">Tạo và quản lý các bài viết trên website</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-post">
              <Plus className="mr-2 h-4 w-4" />
              Tạo bài viết mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Tiêu đề</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Nhập tiêu đề bài viết"
                  required
                  data-testid="input-post-title"
                />
              </div>
              <div>
                <Label htmlFor="excerpt">Mô tả ngắn</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Nhập mô tả ngắn"
                  required
                  data-testid="input-post-excerpt"
                />
              </div>
              <div>
                <MarkdownEditor
                  value={formData.content}
                  onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                  label="Nội dung"
                  placeholder="Nhập nội dung bài viết bằng Markdown..."
                  testId="input-post-content"
                />
              </div>
              <div>
                <Label htmlFor="imageUrl">URL hình ảnh</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                  data-testid="input-post-image"
                />
              </div>
              <div>
                <Label htmlFor="status">Trạng thái</Label>
                <Select value={formData.status} onValueChange={(value: "published" | "draft") => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger data-testid="select-post-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Đã xuất bản</SelectItem>
                    <SelectItem value="draft">Bản nháp</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4 border-t pt-4">
                <h3 className="text-lg font-semibold">Hiển thị bài viết</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="showInBlog"
                      checked={formData.showInBlog}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showInBlog: checked as boolean }))}
                      data-testid="checkbox-show-in-blog"
                    />
                    <Label htmlFor="showInBlog" className="cursor-pointer">Hiển thị ở Blog</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="showInNguoiMoi"
                      checked={formData.showInNguoiMoi}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, showInNguoiMoi: checked as boolean }))}
                      data-testid="checkbox-show-in-nguoi-moi"
                    />
                    <Label htmlFor="showInNguoiMoi" className="cursor-pointer">Hiển thị ở Người mới</Label>
                  </div>
                </div>
              </div>

              {formData.showInNguoiMoi && (
                <div className="space-y-4 border-t pt-4">
                  <h3 className="text-lg font-semibold">Cài đặt cho Người mới</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="moduleId">Module ID</Label>
                      <Input
                        id="moduleId"
                        type="number"
                        value={formData.moduleId ?? ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, moduleId: e.target.value ? parseInt(e.target.value) : undefined }))}
                        placeholder="Nhập module ID (VD: 1)"
                        data-testid="input-module-id"
                      />
                    </div>
                    <div>
                      <Label htmlFor="moduleName">Tên Module</Label>
                      <Input
                        id="moduleName"
                        value={formData.moduleName ?? ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, moduleName: e.target.value || undefined }))}
                        placeholder='VD: "Nền tảng"'
                        data-testid="input-module-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lessonOrder">Thứ tự bài</Label>
                      <Input
                        id="lessonOrder"
                        type="number"
                        value={formData.lessonOrder ?? ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, lessonOrder: e.target.value ? parseInt(e.target.value) : undefined }))}
                        placeholder="Nhập thứ tự (VD: 1)"
                        data-testid="input-lesson-order"
                      />
                    </div>
                    <div>
                      <Label htmlFor="duration">Thời lượng</Label>
                      <Input
                        id="duration"
                        value={formData.duration ?? ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value || undefined }))}
                        placeholder='VD: "7 phút đọc"'
                        data-testid="input-duration"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Mục tiêu</Label>
                    <div className="space-y-2" data-testid="input-objectives">
                      {formData.objectives.map((objective, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={objective}
                            onChange={(e) => updateObjective(index, e.target.value)}
                            placeholder="Nhập mục tiêu"
                            data-testid={`input-objective-${index}`}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeObjective(index)}
                            disabled={formData.objectives.length === 1}
                            data-testid={`button-remove-objective-${index}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addObjective}
                        className="w-full"
                        data-testid="button-add-objective"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Thêm mục tiêu
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Hành động</Label>
                    <div className="space-y-2" data-testid="input-action-steps">
                      {formData.actionSteps.map((step, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={step}
                            onChange={(e) => updateActionStep(index, e.target.value)}
                            placeholder="Nhập hành động"
                            data-testid={`input-action-step-${index}`}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeActionStep(index)}
                            disabled={formData.actionSteps.length === 1}
                            data-testid={`button-remove-action-step-${index}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addActionStep}
                        className="w-full"
                        data-testid="button-add-action-step"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Thêm hành động
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-save-post">
                  {createMutation.isPending || updateMutation.isPending ? "Đang lưu..." : (editingPost ? "Cập nhật" : "Tạo bài viết")}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} data-testid="button-cancel-post">
                  Hủy
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="border-sidebar-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Danh sách bài viết</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts?.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border border-sidebar-border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium text-foreground" data-testid={`post-title-${post.id}`}>{post.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mr-2 ${
                      post.status === 'published' 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {post.status === "published" ? "Published" : "Draft"}
                    </span>
                    {new Date(post.publishedAt!).toLocaleDateString('vi-VN')} • <Eye className="inline w-3 h-3 mr-1" />{post.views} views
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => startEdit(post)}
                    data-testid={`button-edit-post-${post.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => handleDelete(post.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-post-${post.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
