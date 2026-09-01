export async function PUT(request, { params }) {
  await connectDB();

  const user = await getCurrentUser();

  if (!user)
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );

  const body = await request.json();

  const category = await Category.findOneAndUpdate(
    {
      _id: params.id,
      user: user._id,
    },
    body,
    {
      new: true,
    }
  );

  return NextResponse.json({
    success: true,
    category,
  });
}




export async function DELETE(request, { params }) {
  await connectDB();

  const user = await getCurrentUser();

  if (!user)
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );

  await Category.findOneAndDelete({
    _id: params.id,
    user: user._id,
  });

  return NextResponse.json({
    success: true,
  });
}