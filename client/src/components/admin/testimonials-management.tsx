import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Testimonial, insertTestimonialSchema } from "@shared/schema";
import { z } from "zod";
import { Star, Plus, Edit, Trash2 } from "lucide-react";

export default function TestimonialsManagement() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    company: "",
    content: "",
    rating: 5,
    avatarUrl: "",
    featured: false
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: z.infer<typeof insertTestimonialSchema>) => {
      return await apiRequest("POST", "/api/testimonials", data);
    },
    onSuccess: () => {
      toast({ title: "Thành công!", description: "Đánh giá đã được tạo." });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      resetForm();
    },
    onError: () => {
      toast({ title: "Lỗi", description: "Không thể tạo đánh giá.", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<z.infer<typeof insertTestimonialSchema>> }) => {
      return await apiRequest("PUT", `/api/testimonials/${id}`, data);
    },
    onSuccess: () => {
      toast({ title: "Thành công!", description: "Đánh giá đã được cập nhật." });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      resetForm();
    },
    onError: () => {
      toast({ title: "Lỗi", description: "Không thể cập nhật đánh giá.", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/testimonials/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Thành công!", description: "Đánh giá đã được xóa." });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
    },
    onError: () => {
      toast({ title: "Lỗi", description: "Không thể xóa đánh giá.", variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      company: "",
      content: "",
      rating: 5,
      avatarUrl: "",
      featured: false
    });
    setEditingTestimonial(null);
    setIsCreateModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = insertTestimonialSchema.parse(formData);
      
      if (editingTestimonial) {
        updateMutation.mutate({ id: editingTestimonial.id, data: validatedData });
      } else {
        createMutation.mutate(validatedData);
      }
    } catch (error) {
      toast({ title: "Lỗi", description: "Dữ liệu không hợp lệ.", variant: "destructive" });
    }
  };

  const startEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      title: testimonial.title,
      company: testimonial.company || "",
      content: testimonial.content,
      rating: testimonial.rating,
      avatarUrl: testimonial.avatarUrl || "",
      featured: testimonial.featured || false
    });
    setIsCreateModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đánh giá này?")) {
      deleteMutation.mutate(id);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-3 w-3 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
    ));
  };

  if (isLoading) {
    return <div className="animate-pulse space-y-4">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Quản lý đánh giá</h2>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-testimonial">
              <Plus className="mr-2 h-4 w-4" />
              Thêm đánh giá mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? "Chỉnh sửa đánh giá" : "Thêm đánh giá mới"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Tên</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Tên người đánh giá"
                    required
                    data-testid="input-testimonial-name"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Chức vụ</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Content Creator"
                    required
                    data-testid="input-testimonial-title"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="company">Công ty/Thông tin thêm</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="50K followers"
                  data-testid="input-testimonial-company"
                />
              </div>
              <div>
                <Label htmlFor="content">Nội dung đánh giá</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Nhập nội dung đánh giá"
                  className="min-h-[120px]"
                  required
                  data-testid="input-testimonial-content"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rating">Đánh giá (1-5 sao)</Label>
                  <Select value={formData.rating.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, rating: parseInt(value) }))}>
                    <SelectTrigger data-testid="select-testimonial-rating">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 sao</SelectItem>
                      <SelectItem value="2">2 sao</SelectItem>
                      <SelectItem value="3">3 sao</SelectItem>
                      <SelectItem value="4">4 sao</SelectItem>
                      <SelectItem value="5">5 sao</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="featured">Nổi bật</Label>
                  <Select value={formData.featured.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, featured: value === "true" }))}>
                    <SelectTrigger data-testid="select-testimonial-featured">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">Không</SelectItem>
                      <SelectItem value="true">Có</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="avatarUrl">URL ảnh đại diện</Label>
                <Input
                  id="avatarUrl"
                  value={formData.avatarUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, avatarUrl: e.target.value }))}
                  placeholder="https://example.com/avatar.jpg"
                  data-testid="input-testimonial-avatar"
                />
              </div>
              <div className="flex space-x-2">
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-save-testimonial">
                  {createMutation.isPending || updateMutation.isPending ? "Đang lưu..." : (editingTestimonial ? "Cập nhật" : "Tạo đánh giá")}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} data-testid="button-cancel-testimonial">
                  Hủy
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-4">
        {testimonials?.map((testimonial) => (
          <Card key={testimonial.id} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <img 
                  src={testimonial.avatarUrl || "/attached_assets/hieu-suro-profile.png"} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover" 
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium" data-testid={`testimonial-name-${testimonial.id}`}>{testimonial.name}</h3>
                    <div className="flex">
                      {renderStars(testimonial.rating)}
                    </div>
                    {testimonial.featured && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Nổi bật</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2" data-testid={`testimonial-title-${testimonial.id}`}>
                    {testimonial.title} {testimonial.company && `• ${testimonial.company}`}
                  </p>
                  <p className="text-sm" data-testid={`testimonial-content-${testimonial.id}`}>
                    "{testimonial.content}"
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => startEdit(testimonial)}
                  data-testid={`button-edit-testimonial-${testimonial.id}`}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleDelete(testimonial.id)}
                  disabled={deleteMutation.isPending}
                  data-testid={`button-delete-testimonial-${testimonial.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
