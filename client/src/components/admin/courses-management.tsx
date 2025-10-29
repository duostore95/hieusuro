import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Course, insertCourseSchema } from "@shared/schema";
import { z } from "zod";
import { Plus, Edit, Trash2, DollarSign, Clock, Star, Users } from "lucide-react";

export default function CoursesManagement() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
    courseUrl: "",
    duration: "",
    rating: "5.0",
    badge: "",
    status: "active" as "active" | "inactive"
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: z.infer<typeof insertCourseSchema>) => {
      return await apiRequest("POST", "/api/courses", data);
    },
    onSuccess: () => {
      toast({ title: "Thành công!", description: "Khóa học đã được tạo." });
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      resetForm();
    },
    onError: () => {
      toast({ title: "Lỗi", description: "Không thể tạo khóa học.", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<z.infer<typeof insertCourseSchema>> }) => {
      return await apiRequest("PUT", `/api/courses/${id}`, data);
    },
    onSuccess: () => {
      toast({ title: "Thành công!", description: "Khóa học đã được cập nhật." });
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      resetForm();
    },
    onError: () => {
      toast({ title: "Lỗi", description: "Không thể cập nhật khóa học.", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/courses/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Thành công!", description: "Khóa học đã được xóa." });
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
    onError: () => {
      toast({ title: "Lỗi", description: "Không thể xóa khóa học.", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      imageUrl: "",
      courseUrl: "",
      duration: "",
      rating: "5.0",
      badge: "",
      status: "active"
    });
    setEditingCourse(null);
    setIsCreateModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Convert "none" badge back to empty string for API
      const processedData = {
        ...formData,
        badge: formData.badge === "none" ? "" : formData.badge
      };
      const validatedData = insertCourseSchema.parse(processedData);
      
      if (editingCourse) {
        updateMutation.mutate({ id: editingCourse.id, data: validatedData });
      } else {
        createMutation.mutate(validatedData);
      }
    } catch (error) {
      toast({ title: "Lỗi", description: "Dữ liệu không hợp lệ.", variant: "destructive" });
    }
  };

  const startEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price,
      imageUrl: course.imageUrl || "",
      courseUrl: course.courseUrl || "",
      duration: course.duration,
      rating: course.rating || "5.0",
      badge: course.badge || "none",
      status: course.status as "active" | "inactive"
    });
    setIsCreateModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này?")) {
      deleteMutation.mutate(id);
    }
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(parseFloat(price));
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
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Quản lý khóa học</h2>
          <p className="text-muted-foreground">Tạo và quản lý các khóa học trên website</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-course" className="h-11">
              <Plus className="mr-2 h-4 w-4" />
              Tạo khóa học mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCourse ? "Chỉnh sửa khóa học" : "Tạo khóa học mới"}</DialogTitle>
              <DialogDescription>
                {editingCourse ? "Cập nhật thông tin khóa học hiện tại" : "Điền thông tin để tạo khóa học mới"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Tên khóa học</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Nhập tên khóa học"
                  required
                  className="h-11"
                  data-testid="input-course-title"
                />
              </div>
              <div>
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Nhập mô tả khóa học"
                  required
                  className="min-h-[44px]"
                  data-testid="input-course-description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Giá (VNĐ)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="1990000"
                    required
                    className="h-11"
                    data-testid="input-course-price"
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Thời lượng</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="8 tuần"
                    required
                    className="h-11"
                    data-testid="input-course-duration"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="imageUrl">URL hình ảnh</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                  className="h-11"
                  data-testid="input-course-image"
                />
              </div>
              <div>
                <Label htmlFor="courseUrl">Link khóa học (Landing Page)</Label>
                <Input
                  id="courseUrl"
                  value={formData.courseUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, courseUrl: e.target.value }))}
                  placeholder="/shopeezoom hoặc /affshopee"
                  className="h-11"
                  data-testid="input-course-url"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Nếu có link, button "Tham gia ngay" sẽ redirect đến trang này. Để trống để hiển thị thông tin cơ bản.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rating">Đánh giá</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
                    placeholder="5.0"
                    className="h-11"
                    data-testid="input-course-rating"
                  />
                </div>
                <div>
                  <Label htmlFor="badge">Badge</Label>
                  <Select value={formData.badge} onValueChange={(value) => setFormData(prev => ({ ...prev, badge: value }))}>
                    <SelectTrigger className="h-11" data-testid="select-course-badge">
                      <SelectValue placeholder="Chọn badge" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Không có</SelectItem>
                      <SelectItem value="Bestseller">Bestseller</SelectItem>
                      <SelectItem value="Mới">Mới</SelectItem>
                      <SelectItem value="Hot">Hot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="status">Trạng thái</Label>
                <Select value={formData.status} onValueChange={(value: "active" | "inactive") => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger className="h-11" data-testid="select-course-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Không hoạt động</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="h-11" data-testid="button-save-course">
                  {createMutation.isPending || updateMutation.isPending ? "Đang lưu..." : (editingCourse ? "Cập nhật" : "Tạo khóa học")}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} className="h-11" data-testid="button-cancel-course">
                  Hủy
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {courses?.map((course) => (
          <Card key={course.id} className="rounded-lg border border-sidebar-border bg-card text-card-foreground shadow-sm hover:bg-accent/50 transition-colors">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium px-2 py-1 rounded-md ${course.status === 'active' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'}`}>
                    {course.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-lg font-bold text-primary" data-testid={`course-price-${course.id}`}>
                    {formatPrice(course.price)}
                  </span>
                </div>
                <h3 className="text-xl font-bold" data-testid={`course-title-${course.id}`}>{course.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span><Users className="mr-1 h-3 w-3 inline" /> {course.studentCount} học viên</span>
                  <span><Star className="mr-1 h-3 w-3 inline text-yellow-500" /> {course.rating}</span>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 h-11"
                    onClick={() => startEdit(course)}
                    data-testid={`button-edit-course-${course.id}`}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Chỉnh sửa
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon"
                    className="h-11 w-11"
                    onClick={() => handleDelete(course.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-course-${course.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
